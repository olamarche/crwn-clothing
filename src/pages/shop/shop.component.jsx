import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { fetchCollectionStartAsync, updateCollections } from "../../redux/shop/shop.action";
import { selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    const { match } = this.props;
    const { isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner  isLoading={isCollectionFetching} {...props}/> } />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => <CollectionsPageWithSpinner  isLoading={!isCollectionsLoaded} {...props}/> } />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
