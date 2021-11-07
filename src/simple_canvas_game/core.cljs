(ns simple-canvas-game.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]))

(def SCREEN-WIDTH 500)
(def SCREEN-HEIGHT 500)

(def game-state (r/atom {}))

(defn setup [state]
  (reset! game-state state))

(defn draw []
  (let [canvas (.getElementById js/document "game-canvas")
        context (.getContext canvas "2d")
        pos (:pos @game-state)]
    (.clearRect context 0 0 SCREEN-WIDTH SCREEN-HEIGHT)
    (set! (.-fillStyle context) "green")
    (.fillRect context pos 10 150 150)))

(defn on-key-down [key]
  (let [key-code (.-code key)
        arrow-down (-> @game-state :input :arrow-down)
        arrow-up (-> @game-state :input :arrow-up)]
    (case (key-code)
      "ArrowDown" ;;TODO Save value in game-state
      "ArrowUp" ;;TODO Save value in game-state
      )))

(defn on-key-up [key])

(defn observe-key-events []
  (.addEventListener js/document "keydown" on-key-down false)
  (.addEventListener js/document "keyup" on-key-up false))

(defn run-game []
  ;;Initial state of the game
  (setup {:player {:pos {:x 10 :y 10}
                   :size {:w 50 :h 50}}
          :input {:arrow-up false
                  :arrow-down false}})

  ;observe and store inputs (outside setInterval)
  (observe-key-events)

  ;;update game-state (inside setInterval)

  ;;Draw the current state of the game
  (js/setInterval draw 10))

(defn update-state []
  (reset! game-state {:pos (inc (:pos @game-state))})
  (draw))

(defn home-page []
  [:div
   [:div
    [:button {:on-click run-game} "Start Game"]
    [:button {:on-click update-state} "Update"]]
   [:div
    [:canvas#game-canvas {:width SCREEN-WIDTH :height SCREEN-HEIGHT}]]])

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
