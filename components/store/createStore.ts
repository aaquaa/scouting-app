import { create } from 'zustand'
import { devtools, persist, PersistOptions } from 'zustand/middleware'

/**
 * Type that marks given fields of a type as non-optional
 */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * Define the app version (increment when pushing new updates)
 */
const APP_VERSION = '2.0' // Update this when you deploy a new version

/**
 * Create a zustand store.
 * @param initialState The initial state of the store
 * @param name The name of the store
 * @param localStorageOptions Local storage will be used if provided.
 * @returns A store
 */
export function createStore<T extends object>(
  initialState: T,
  name: string,
  // Remove `name` from the `PersistOptions` type and add it back later, also make `version` required
  localStorageOptions?: WithRequired<Omit<PersistOptions<T>, 'name'>, 'version'>
) {
  if (localStorageOptions) {
    const store = create<T>()(
      devtools(
        persist(() => initialState, { ...localStorageOptions, name }),
        { name }
      )
    )

    /**
     * Check if the stored version is outdated and reset local storage if needed
     */
    function checkVersion() {
      const savedVersion = localStorage.getItem('app_version')
      if (savedVersion !== APP_VERSION) {
        console.log(`New version detected (${APP_VERSION}), resetting local storage...`)
        localStorage.setItem('app_version', APP_VERSION)
        store.setState(initialState) // Reset Zustand state
      }
    }

    // Run the version check on load
    checkVersion()

    return store
  }

  return create<T>()(devtools(() => initialState, { name }))
}
