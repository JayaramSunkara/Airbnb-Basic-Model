export async function getLogin(req, res, next) {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
}

export async function postLogin(req, res, next) {
  console.log(req.body);
  req.session.isLoggedIn = true;
  //res.cookie("isLoggedIn", true);
  //req.isLoggedIn = true;
  res.redirect("/");
}
export async function getLogout(req, res, next) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}
