import React from 'react';
import { BackGround, Loading } from './LoadMore.styled';



 export function LoadingMore ({onLoadMore  }) {
  
  
  return (
      <BackGround>
           <Loading onClick={onLoadMore}>Load More</Loading>
      </BackGround>
  );
}
