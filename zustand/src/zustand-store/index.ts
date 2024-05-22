import { create } from "zustand";
import { api } from "../lib/axios";

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

type Set = (partial: PlayerState | Partial<PlayerState> | ((state: PlayerState) => PlayerState | Partial<PlayerState>), replace?: boolean | undefined) => void
type Get = () => PlayerState

const load = (set: Set) => async () => {
  try {
    set({ isLoading: true })

    const response = await api.get('/courses/1')
    //throw new Error('Error loading store')
    set({
      course: response.data,
      isLoading: false,
    })
  } catch(error: any) {
    throw error
  } finally {
    set({ isLoading: false })
  }
}

const play = (set: Set) => (moduleAndLessonIndex: [number, number]) => {
  const [moduleIndex, lessonIndex] = moduleAndLessonIndex

  set({
    currentModuleIndex: moduleIndex,
    currentLessonIndex: lessonIndex,
  })
}

const next = (get: Get, set: Set) => () => {
  const { currentLessonIndex, currentModuleIndex, course } = get()

  const nextLessonIndex = currentLessonIndex + 1;
  const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];

  if (nextLesson) {
    set({ currentLessonIndex: nextLessonIndex })
  } else {
    const nextModuleIndex = currentModuleIndex + 1;
    const nextModule = course?.modules[nextModuleIndex];

    if (nextModule) {
      set({
        currentModuleIndex: nextModuleIndex,
        currentLessonIndex: 0,
      })
    }
  }
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: load(set),

    play: play(set),

    next: next(get, set),
  }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
