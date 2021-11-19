(ns simple-canvas-game.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]))

(def SCREEN-WIDTH 500)
(def SCREEN-HEIGHT 500)
(def PADDLE-SPEED 0.1)

(def game-state (r/atom {}))

(defn setup [state]
  (reset! game-state state))

(defn draw [state]
  (let [canvas (.getElementById js/document "game-canvas")
        context (.getContext canvas "2d")]
    (.clearRect context 0 0 SCREEN-WIDTH SCREEN-HEIGHT)
    (set! (.-fillStyle context) "black")
    (.fillRect context (-> state :paddle1 :pos :x) (-> state :paddle1 :pos :y) 20 150)))

(defn on-key-down [event]
  (case (.-code event)
    "ArrowDown" (swap! game-state assoc-in [:input :arrow-down] true)
    "ArrowUp" (swap! game-state assoc-in [:input :arrow-up] true)
    false))

(defn on-key-up [event]
  (case (.-code event)
    "ArrowDown" (swap! game-state assoc-in [:input :arrow-down] false)
    "ArrowUp" (swap! game-state assoc-in [:input :arrow-up] false)))

(defn observe-key-events []
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

(defn update-paddle [state]
  (let [dir1 (-> state :paddle1 :dirY)
        posY (-> state :paddle1 :pos :y)]
    (assoc-in state [:paddle1 :pos :y] (+ PADDLE-SPEED posY))))

(defn update-game [state]
  (swap! game-state #(-> state
                         input->state
                         update-paddle)))

(defn run-game []
  (setup {:paddle1 {:pos {:x 10 :y 50}
                    :dirY 0}
          :paddle2 {:pos {:x 10 :y 10}
                    :dirY 0}
          :ball {:pos {:x (/ SCREEN-WIDTH 2) :y (/ SCREEN-HEIGHT 2)}}
          :input {:arrow-up false
                  :arrow-down false}})

  (observe-key-events)

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
