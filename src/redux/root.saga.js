import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart/cart.saga';
import { fetchCollectionStart, shopSagas } from './shop/shop.saga';
import { userSagas } from './user/user.saga';

export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ])
}