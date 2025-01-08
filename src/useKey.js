import { useState, useEffect } from "react";

export  function useKey(key, action) {   

     useEffect(function() {
        function callback (e) {
            if(e.code.toLowerCase() === key.toLowerCase){ 
                action();
                
            }
          }

        document.addEventListener('keydown', callback);

        return function () {
            console.log('Cleaning up escape key listener'); // Debug log
            document.removeEventListener('keydown', callback);
        };
    
  
  
      }, [action, key]);


    
}


