function paginationCtrl(scope){
    
    scope.person = {};
    scope.personData = [];
    scope.personDataPaginated = [];
    scope.editEnabled = false;
    scope.pages = [1];
    scope.selectedPage = 1;
    
    let offset = 0,
        limit = 5;
    
    scope.submit = function(){
        
        if(scope.personData.length!=0 &&scope.personData.length%5==0){
            scope.pages.push(scope.pages[scope.pages.length-1]+1);
        }
        
        scope.personData.push(angular.copy(scope.person));
        
        scope.personDataPaginated = scope.personData.slice(offset,offset+limit);
        
        let jsonString = JSON.stringify(scope.personData);
        window.localStorage["person"] = jsonString;
        
        scope.person = {};
        
    }
    
    scope.delete = function(index){
        
        
        scope.personData.splice(index+offset,1);
        let jsonString = JSON.stringify(scope.personData);
        window.localStorage["person"] = jsonString;
        
         if(scope.personData.length%5==0){
             if(scope.pages>1){
                 scope.selectedPage -= 1;
                 scope.pages.splice(scope.pages.length-1,1);
             }
            
             if(offset>=5)
             offset = offset -5;
             
              
        }
        
        scope.personDataPaginated = scope.personData.slice(offset,offset+limit);
        
    }
    scope.edit = function(){
        scope.editEnabled = true;
        
    }
    scope.makeChanges = function(idx){
        //scope.personData[idx] = scope.person;
        //console.log(scope.person)
        
        scope.personDataPaginated = scope.personData.slice(offset,offset+limit);
        
         let jsonString = JSON.stringify(scope.personData);
        window.localStorage["person"] = jsonString;
        
        scope.editEnabled = false;
    }
    
    scope.discardChanges = function(idx){
        scope.editEnabled = false;
        scope.personDataPaginated[idx+offset] = angular.copy(scope.personData[idx+offset]);
    }
    
    scope.navigate = function(page){
        offset = 5*(page-1);
         scope.personDataPaginated = scope.personData.slice(offset,offset+limit);
        scope.selectedPage = parseInt(page);
    }
    
    function initialisePersonData(){
        var data = window.localStorage["person"];
        if(data){
            scope.personData = JSON.parse(data);
             scope.personDataPaginated = scope.personData.slice(offset,offset+limit);
            let pages = 0;
            if(scope.personData.length>5)
                pages = (scope.personData.length/5)%1==0?scope.personData.length/5: parseInt(scope.personData.length/5) + 1
            
            for(let i= 1;i<pages;i++){
                scope.pages.push(i+1);
            }
        }
        
    } 
    
    initialisePersonData();
    
}


angular.module("pageApp",[])

.controller("paginationCtrl",["$scope",paginationCtrl]);