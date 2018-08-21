    public class LoginViewModel
    {
        /// <summary>
        /// User will login with their email.
        /// </summary>
        [Required]
        [Display(Name = "Username/Email")]
        public string Email { get; set; }

        /// <summary>
        /// User will provide their password to log in.
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        /// <summary>
        /// Will keep the user information in the email and text box for quick logins for returning users.
        /// </summary>
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }

        /// <summary>
        ///Note for the event
        /// </summary>
        public string Note { get; set; }
    }