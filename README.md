# Custom components for Ionic with Vue applications

## List of component
* IonSearch
* IonClientPagination
* IonServerPagination
* IonFile

## IonAutocomplete
A select component that includes search mode.  
![GIF Recording 2024-03-03 at 6.16.36 PM.gif](https://i.ibb.co/wMDXFc2/GIF-Recording-2024-03-03-at-6-13-12-PM.gif)  
![GIF Recording 2024-03-03 at 6.13.12 PM.gif](https://i.ibb.co/ysLr6md/GIF-Recording-2024-03-03-at-6-16-36-PM.gif)  
  
## IonClientPagination  
A component that displays elements with client-side pagination.  
![GIF Recording 2024-03-03 at 6.22.31 PM.gif](https://i.ibb.co/HPfwdNL/GIF-Recording-2024-03-03-at-6-19-12-PM.gif)
![GIF Recording 2024-03-03 at 6.19.12 PM.gif](https://i.ibb.co/6Bqz2wq/GIF-Recording-2024-03-03-at-6-22-31-PM.gif)  
  

## IonServerPagination
This component allows you to view previously paged information in the backend.


This interface is the one that receives as prop pagination.
```ts
export interface GetPaginationResponse {
pages: 0,
page: number,
take: number,
total: number,
items: any[]
}
```
![GIF Recording 2024-03-03 at 6.25.40 PM.gif](https://i.ibb.co/HPfwdNL/GIF-Recording-2024-03-03-at-6-19-12-PM.gif)
![GIF Recording 2024-03-03 at 6.19.12 PM.gif](https://i.ibb.co/drtrgCD/2024-03-04-10-19-09-tamplate-app-Banned-vue.png)  

## IonFile
Component to grab files regardless of platform
![example_code_ion_file](https://i.ibb.co/hdbxPV8/2024-03-04-10-22-08-tamplate-app-Account-Update-Component-vue.png)
![example_page_ion_file](https://i.ibb.co/y6VwY3R/2024-03-04-10-23-46-Ionic-App-Mozilla-Firefox.png)