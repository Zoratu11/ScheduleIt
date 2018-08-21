        public ActionResult Delete(string Id)
        {
            ApplicationUser user = db.Users.Find(Id);
            string userRole = UserManager.GetRoles(Id).First();
            ViewBag.userFullname = user.FirstName + " " + user.LastName;
            ViewBag.userId = user.Id;

            return View();
        }

        //Post /User/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(LoginViewModel model, string userToDeleteId, string returnUrl)
        {
            ViewData["ReturnUrl"] = returnUrl;
            //If email contains an @ symbol 
            if (model.Email.IndexOf("@") > -1)
            {
                //Validate email with regex
                string regexString = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                               @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
                Regex regex = new Regex(regexString);
                if (!regex.IsMatch(model.Email))
                {
                    ModelState.AddModelError("Email", "Email is not valid!");
                }
            }
            else
            {
                //Validate Username with regex
                string regexString = @"^[a-zA-Z0-9]*$";
                Regex regex = new Regex(regexString);
                if (!regex.IsMatch(model.Email))
                {
                    ModelState.AddModelError("Email", "Username is not valid!");
                }
            }
            
            
            if (ModelState.IsValid)
            {
                ApplicationUser user = await db.Users.Where(u => u.UserName == model.Email).FirstOrDefaultAsync();
                PasswordHasher ph = new PasswordHasher();
                var result = ph.VerifyHashedPassword(user.PasswordHash, model.Password);

                if(result != PasswordVerificationResult.Success)
                {
                    ModelState.AddModelError("", "There was a problem with the password or username, please try again or contact you system administrator if the problem continues.");
                    return Content("There was a problem with the password or username, please try again or contact you system administrator if the problem continues. You can use the back arrow to return to the previous page.");
                }

                var userToDelete = await db.Users.Where(u => u.Id == userToDeleteId)
                            .Include(u => u.Schedules)
                            .Include(u => u.RequestedTimeOff)
                            .Include(u => u.WorkEvents)
                            .Include(u => u.SenderMessages)
                            .Include(u => u.RecipientMessages)
                            .FirstOrDefaultAsync();                

                db.Users.Remove(userToDelete);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");

            }

            //If model is not valid
            return View(model);
        }