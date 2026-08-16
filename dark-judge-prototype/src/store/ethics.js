import { defineStore } from 'pinia'
import { scenarios } from '../data/scenarios'

function emptyProgress() {
  const progress = {}
  for (const s of scenarios) {
    progress[s.id] = {
      found: [],
      falseClicks: 0,
      trapped: false,
      redesignChoiceId: null,
      redesignCorrect: null,
      completed: false,
    }
  }
  return progress
}

export const useEthicsStore = defineStore('ethics', {
  state: () => ({
    progress: emptyProgress(),
  }),

  getters: {
    scenarioFoundCount: (state) => (id) => state.progress[id]?.found.length ?? 0,

    scenarioAccuracy: (state) => (id) => {
      const scenario = scenarios.find((s) => s.id === id)
      const p = state.progress[id]
      if (!scenario || !p) return 0
      return Math.round((p.found.length / scenario.totalHotspots) * 100)
    },

    attemptedScenarios: (state) =>
      scenarios.filter((s) => state.progress[s.id].found.length > 0 || state.progress[s.id].completed),

    // per-category score: found-in-category / total-in-category, blended with
    // redesign-correctness for the 'fairness' dimension
    categoryScore: (state) => (category) => {
      let total = 0
      let found = 0
      for (const s of scenarios) {
        for (const [hid, h] of Object.entries(s.hotspots)) {
          if (h.category !== category) continue
          total += 1
          if (state.progress[s.id].found.includes(hid)) found += 1
        }
      }
      let base = total === 0 ? 100 : Math.round((found / total) * 100)

      if (category === 'fairness') {
        const completed = scenarios.filter((s) => state.progress[s.id].redesignChoiceId)
        if (completed.length > 0) {
          const correct = completed.filter((s) => state.progress[s.id].redesignCorrect).length
          const redesignScore = Math.round((correct / completed.length) * 100)
          base = Math.round(base * 0.5 + redesignScore * 0.5)
        }
      }

      if (category === 'autonomy') {
        const trappedCount = scenarios.filter((s) => state.progress[s.id].trapped).length
        base = Math.max(0, base - trappedCount * 10)
      }

      return base
    },

    overallScore() {
      const t = this.categoryScore('transparency')
      const a = this.categoryScore('autonomy')
      const f = this.categoryScore('fairness')
      return Math.round((t + a + f) / 3)
    },

    totalFound: (state) => {
      return Object.values(state.progress).reduce((sum, p) => sum + p.found.length, 0)
    },

    totalHotspots: () => scenarios.reduce((sum, s) => sum + s.totalHotspots, 0),

    scenariosCompleted: (state) => scenarios.filter((s) => state.progress[s.id].completed).length,
  },

  actions: {
    recordHotspot(scenarioId, hotspotId) {
      const p = this.progress[scenarioId]
      if (!p.found.includes(hotspotId)) p.found.push(hotspotId)
    },
    recordFalseClick(scenarioId) {
      this.progress[scenarioId].falseClicks += 1
    },
    recordTrapped(scenarioId) {
      this.progress[scenarioId].trapped = true
    },
    recordRedesign(scenarioId, choiceId, isCorrect) {
      const p = this.progress[scenarioId]
      p.redesignChoiceId = choiceId
      p.redesignCorrect = isCorrect
      p.completed = true
    },
    resetScenario(scenarioId) {
      this.progress[scenarioId] = emptyProgress()[scenarioId]
    },
    resetAll() {
      this.progress = emptyProgress()
    },
  },
})
