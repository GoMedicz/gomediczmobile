import {create} from "zustand";



export const useZustandStore = create((set) => ({

    theme:'Light',
    setTheme: (text) => set((state) => ({ 
        theme: text
    })),
    language:'English',
    setLanguage: (text) => set((state) => ({ 
        language: text
    })),
    fetch: async (pond) => {
        const response = await fetch(pond)
        set({ fishies: await response.json() })
      },

    todos: [],
    bears: 0,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    addTodo: (row) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                   row
                },
            ],
        })),
})); 