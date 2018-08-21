        // POST: Update/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost, ActionName("Edit")]
        //[ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        public ActionResult EditPost(string Id)
        {
            var userToUpdate = db.Users.Find(Id);
            //We will convert this to a bool on the frontend
            string success;

            if (TryUpdateModel(userToUpdate, "", new string[] { "FirstName", "LastName", "UserName", "PhoneNumber", "Department", "Position", "Address", "HourlyPayRate", "Email", "HireDate", "Fulltime" }))
            {
                try
                {
                    db.SaveChanges();
                    success = "true";
                    return Json(success);
                }
                catch (Exception)
                {
                    //ModelState.AddModelError("", "Unable to save changes.");
                    success = "false";
                    return Json(success);
                }
            }
            return View();
        }