        [HttpPost]
        public async Task<ActionResult> ChangeRole(string userId, string currentRole, string roleToChangeTo)
        {
            if(roleToChangeTo == null)
            {
                roleToChangeTo = "User";
            }
            IdentityResult removeResult = await UserManager.RemoveFromRoleAsync(userId, currentRole);
            IdentityResult addResult = await UserManager.AddToRoleAsync(userId, roleToChangeTo);


            if(removeResult.Succeeded && addResult.Succeeded)
            {
                return Content("Success");
            } else
            {
                return Content("Failure");
            }
        }