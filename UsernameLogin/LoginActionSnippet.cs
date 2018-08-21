        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            ViewData["ReturnUrl"] = returnUrl;
            //If email contains an @ symbol 
            if(model.Email.IndexOf("@") > -1)
            {
                //Validate email with regex
                string regexString = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                               @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
                Regex regex = new Regex(regexString);
                if(!regex.IsMatch(model.Email))
                {
                    ModelState.AddModelError("Email", "Email is not valid!");
                }
            } else
            {
                //Validate Username with regex
                string regexString = @"^[a-zA-Z0-9]*$";
                Regex regex = new Regex(regexString);
                if(!regex.IsMatch(model.Email))
                {
                    ModelState.AddModelError("Email", "Username is not valid!");
                }
            }

            string username;
            if (ModelState.IsValid)
            {
                username = model.Email;
                if(username.IndexOf("@") > -1)
                {
                    var user = await UserManager.FindByEmailAsync(model.Email);
                    if(user == null)
                    {
                        ModelState.AddModelError(string.Empty, "Invalid login attempt");
                        return View(model);
                    } else
                    {
                        username = user.UserName;
                    }
                }
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, change to shouldLockout: true
                var result = await SignInManager.PasswordSignInAsync(username, model.Password, model.RememberMe, shouldLockout: false);

                switch (result)
                {
                    case SignInStatus.Success:
                        return RedirectToAction("LoginRoute");
                    case SignInStatus.LockedOut:
                        return View("Lockout");
                    case SignInStatus.RequiresVerification:
                        return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                    case SignInStatus.Failure:
                    default:
                        ModelState.AddModelError("", "Invalid login attempt.");
                        return View(model);
                }
            }

            //If model is not valid
            return View(model);

            
        }