import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Router, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

	

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
		
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
	}
	
	onMenuItemTap(navItemRoute: string): void {
		try {
			console.log(navItemRoute)
			this.routerExtensions.navigate([navItemRoute], {
				transition: {
					name: "fade"
				}
			});
		} catch (e) {
			console.log(e)
		}
	}
}
