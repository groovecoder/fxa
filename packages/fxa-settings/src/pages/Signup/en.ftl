## Account Signup page
## This is the second page of the sign up flow, users have already entered their email

signup-heading = Set your password
# This text is displayed in a dismissible info banner and is only displayed to Pocket clients
# <LinkExternal> leads to https://support.mozilla.org/kb/pocket-firefox-account-migration
signup-info-banner-for-pocket = Why do I need to create this account? <LinkExternal>Find out here</LinkExternal>
# This aria-label applies to the dismiss/close button of the signup-info-banner-for-pocket
# This text is read by screen-readers
signup-info-banner-dismiss-button =
  .aria-label = Close
# Clicking on this link returns the user to the beginning of the flow so they can enter a new email address
signup-change-email-link = Change email
signup-new-password-label = Password
signup-confirm-password-label = Repeat password
signup-submit-button = Create account
# Checking the user's age is required by COPPA. To register for an account, the user must indicate their age (number only)
signup-age-check-input-label = How old are you?
# Error displayed in a tooltip when the user attempts to submit the form without filling in their age
signup-age-check-input-error = You must enter your age to sign up
# Link goes to https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-not-just-kids-sites
# This link appears just below signup-age-check-input-label
signup-coppa-check-explanation-link = Why do we ask?

# Heading above a checklist of services/information that can be synced across signed in devices
# List includes bookmarks, history, passwords, add-ons, etc.
signup-choose-what-to-sync-heading = Choose what to sync
# "Choose what to sync" list item
signup-sync-engine-history = History
# "Choose what to sync" list item
signup-sync-engine-passwords = Passwords
# "Choose what to sync" list item
signup-sync-engine-addons = Add-ons
# "Choose what to sync" list item. refers to 'tabs that are open', not the action
signup-sync-engine-open-tabs = Open Tabs
# "Choose what to sync" list item
signup-sync-engine-preferences = Preferences
# "Choose what to sync" list item
signup-sync-engine-addresses = Addresses
# "Choose what to sync" list item
signup-sync-engine-credit-cards = Credit Cards

# Shown above a list of newsletters. Checking an item in the list subscribes the user to that newsletter.
signup-newsletter-subscription-heading = Practical knowledge is coming to your inbox. Sign up for more:
# Newsletter subscription option
signup-newsletter-account-journey = Get the latest news about {-brand-mozilla} and {-brand-firefox}
# Newsletter subscription option
signup-newsletter-take-action = Take action to keep the internet healthy
# Newsletter subscription option
signup-newsletter-knowledge-is-power = Be safer and smarter online

# Agreement statement shown to all users except Pocket clients. Refers to Mozilla/Firefox's ToS and Privacy Notice.
signup-default-terms-privacy-agreement = By proceeding, you agree to the <a>Terms of Service</a> and <a>Privacy Notice</a>.
# Agreement statement shown to Pocket clients signing up for a Firefox account.
signup-pocket-terms-privacy-agreement = By proceeding, you agree to:
  <br />{product-pocket}’s <LinkExternal>Terms of Service</LinkExternal> and <LinkExternal>Privacy Notice</LinkExternal>
  <br />{-brand-firefox}’s <a>Terms of Service</a> and <a>Privacy Notice</a>
