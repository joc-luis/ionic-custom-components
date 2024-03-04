# Custom components for Ionic with Vue applications

## List of component
* IonSearch
* IonClientPagination
* IonServerPagination

## IonSearch
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
![GIF Recording 2024-03-03 at 6.19.12 PM.gif](https://i.ibb.co/nmC1wpz/GIF-Recording-2024-03-03-at-6-25-40-PM.gif)  