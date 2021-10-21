import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage

})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");

        dispatch(fetchCollectionStart());

        collectionRef.get().then(async (snapshot) => {
          const collectionMap = convertCollectionsSnapshotToMap(snapshot);
          console.log(collectionMap);
          dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error => fetchCollectionsFailure(error));
    }
}


export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})
