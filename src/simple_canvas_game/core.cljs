(ns simple-canvas-game.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]))
(def SCREEN-WIDTH 500)
(def SCREEN-HEIGHT 300)

(def PADDLE-SPEED 1)
(def PADDLE-WIDTH 20)
(def PADDLE-HEIGHT 80)

(def BALL-SPEED 0.5)

(def game-state (r/atom
                 {:paddle1 {:x 10
                            :y 100
                            :dirY 0}
                  :paddle2 {:x (- SCREEN-WIDTH 20)
                            :y 100
                            :dirY 0}
                  :ball {:x (/ SCREEN-WIDTH 2)
                         :y (/ SCREEN-HEIGHT 2)
                         :dirX 1
                         :dirY 1
                         :size 5}
                  :input {:arrow-up false
                          :arrow-down false}}))

(defn draw-paddles [state context]
  (set! (.-fillStyle context) "black")
  (.fillRect context (-> state :paddle1 :x) (-> state :paddle1 :y) PADDLE-WIDTH PADDLE-HEIGHT)
  (.fillRect context (-> state :paddle2 :x) (-> state :paddle2 :y) PADDLE-WIDTH PADDLE-HEIGHT))

(defn draw-ball [state context]
  (set! (.-fillStyle context) "black")
  (.beginPath context)
  (.arc context (-> state :ball :posX) (-> state :ball :posY) (-> state :ball :size) 0 (* 2 3.14))
  (.stroke context))

(defn draw [state]
  (let [canvas (.getElementById js/document "game-canvas")
        context (.getContext canvas "2d")]
    (.clearRect context 0 0 SCREEN-WIDTH SCREEN-HEIGHT)
    (draw-paddles state context)
    (draw-ball state context)))

(defn on-key-down [event]
  (case (.-code event)
    "ArrowDown" (swap! game-state assoc-in [:input :arrow-down] true)
    "ArrowUp" (swap! game-state assoc-in [:input :arrow-up] true)
    false))

(defn on-key-up [event]
  (case (.-code event)
    "ArrowDown" (swap! game-state assoc-in [:input :arrow-down] false)
    "ArrowUp" (swap! game-state assoc-in [:input :arrow-up] false)))

(defn listen-for-key-events []
  (.addEventListener js/document "keydown" on-key-down false)
  (.addEventListener js/document "keyup" on-key-up false))

(defn input->state [state]
  (let [arrow-down (-> state :input :arrow-down)
        arrow-up (-> state :input :arrow-up)]
    (-> state
        (assoc-in [:paddle1 :dirY] (cond
                                     (and arrow-down arrow-up) 0
                                     arrow-up 1
                                     arrow-down -1
                                     :else 0)))))

(defn new-paddle-pos [current-posY dir]
  (let [new-posY (- current-posY (* PADDLE-SPEED dir))]
    (if (and (< 0 new-posY) (>= SCREEN-HEIGHT (+ new-posY PADDLE-HEIGHT)))
      new-posY
      current-posY)))

(defn update-paddle [state]
  (let [dir (-> state :paddle1 :dirY)
        posY (-> state :paddle1 :y)]
    (-> state
        (assoc-in [:paddle1 :y] (new-paddle-pos posY dir))
        (assoc-in [:paddle2 :y] (new-paddle-pos posY dir)))))

(defn collide-with-paddles? [ball paddle1 paddle2]
  true)

(defn update-ball [state]
  (let [posX (-> state :ball :posX)
        posY (-> state :ball :posY)
        dirX (-> state :ball :dirX)
        dirY (-> state :ball :dirY)
        new-posX (+ posX (* BALL-SPEED dirX))
        new-posY (+ posY (* BALL-SPEED dirY))]
    (-> state
        (assoc-in [:ball :posX] new-posX)
        (assoc-in [:ball :posY] new-posY)
        (assoc-in [:ball :dirY] (if (and (< 0 new-posY) (> SCREEN-HEIGHT new-posY))
                                  dirY
                                  (* -1 dirY)))
        (assoc-in [:ball :dirX] (if (collide-with-paddles? (-> state :ball) (-> state :paddle1) (-> state :paddle2))
                                  (* -1 dirX)
                                  dirX)))))

(defn update-game [state]
  (swap! game-state #(-> state
                         input->state
                         update-paddle
                         update-ball)))

(defn run-game []
  (listen-for-key-events)
  (js/setInterval (fn []
                    (-> @game-state
                        (update-game)
                        (draw)) 10)))

(defn home-page []
  [:div
   [:div
    [:button {:on-click run-game} "Start Game"]]
   [:div
    [:canvas#game-canvas {:width SCREEN-WIDTH :height SCREEN-HEIGHT}]]
   [:div
    [:h4 (str @game-state)]]])

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
