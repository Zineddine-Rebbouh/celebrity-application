export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("logindata") !== "undefined"
      ? JSON.parse(localStorage.getItem("logindata"))
      : localStorage.clear()

  return userInfo
}
