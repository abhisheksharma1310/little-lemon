export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Store the entire state in local storage
  localStorage.setItem("reduxState", JSON.stringify(state));

  return result;
};
