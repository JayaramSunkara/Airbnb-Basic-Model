export async function getLogin(req, res, next) {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
}

export async function postLogin(req, res, next) {
  console.log(req.body);
  req.session.isLoggedIn = true;
  //res.cookie("isLoggedIn", true);
  //req.isLoggedIn = true;
  res.redirect("/");
}
export async function postLogout(req, res, next) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

export async function getSignup() {}
export async function postSignup() {}