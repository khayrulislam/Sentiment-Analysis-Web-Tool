import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalData, NavigationItem, Repository } from 'src/app/data/data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

    repository: Repository;    

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
    map(result => result.matches),
    //share()
    );

    constructor(private breakpointObserver: BreakpointObserver, private router:Router,
        private r:ActivatedRoute) {}

    ngOnInit(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
    }

    openStartPage()
    {
        this.router.navigateByUrl(`/`);   
    }

    onNavigate(clickItem:string){
        debugger;
        if(clickItem === NavigationItem.Dashboard) this.router.navigate(['dashboard'],{queryParams:{name:this.repository.Name}, relativeTo:this.r});
        else if(clickItem === NavigationItem.Branch) this.router.navigate(['branch'],{queryParams:{name:this.repository.Name}, relativeTo:this.r});
    
    }

}
