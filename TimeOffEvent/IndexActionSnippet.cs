				// GET: TimeOffEvent
        public ActionResult Index()
        {
            string currentUserId = User.Identity.GetUserId();
            var timeOffEvents = db.TimeOffEvents.Where(t => t.User.Id == currentUserId).Include(t => t.User);
            return View(timeOffEvents.ToList());
        }