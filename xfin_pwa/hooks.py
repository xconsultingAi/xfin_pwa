app_name = "xfin_pwa"
app_title = "XFin"
app_publisher = "Xconsol"
app_description = "Installable mobile app (PWA) for recording Expense and Income Journal Entries in ERPNext"
app_email = "xconsol.pk@gmail.com"
app_license = "agpl-3.0"

required_apps = ["erpnext"]

app_logo_url = "/assets/xfin_pwa/manifest/icon-192.png"
app_home = "/xfin"

add_to_apps_screen = [
	{
		"name": app_name,
		"logo": app_logo_url,
		"title": app_title,
		"route": app_home,
		"has_permission": "xfin_pwa.api.check_app_permission",
	}
]

# The Vue app handles its own routes under /xfin (e.g. /xfin/expense)
website_route_rules = [
	{"from_route": "/xfin/<path:app_path>", "to_route": "xfin"},
]
