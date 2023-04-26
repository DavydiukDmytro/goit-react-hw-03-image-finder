import { Component } from 'react';
import { getImages } from 'services/api';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Container, Text } from './App.styled';
import { scroll } from 'utils/scroll';
import { MagnifyingGlass, ThreeDots } from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    search: '',
    response: {},
    images: [],
    totalHits: 0,
    page: 1,
    error: `We didn't find anything`,
    isButtonLoad: false,
    loader: false,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { search } = this.state;
    if (prevState.search !== search) {
      scroll();
      this.setState({ status: Status.PENDING });
      const pageNumper = 1;
      try {
        const response = await getImages(search, pageNumper);

        this.setState({
          page: pageNumper,
          images: response.hits,
          totalHits: response.totalHits,
          status: Status.RESOLVED,
          error: `We didn't find anything`,
        });
        if (response.totalHits === 0) {
          this.setState({
            status: Status.REJECTED,
          });
        }
        if (response.totalHits > 12) {
          this.setState({
            isButtonLoad: true,
          });
        }
      } catch (error) {
        this.setState({ error: error.message, status: Status.REJECTED });
      }
    }
  }

  handleSearch = searchWord => {
    this.setState({ search: searchWord.trim() });
  };

  onClickLoad = async () => {
    const { search, page, totalHits } = this.state;
    try {
      this.setState({ loader: true });
      const pageNumber = page + 1;
      const response = await getImages(search, pageNumber);
      this.setState(s => ({
        page: pageNumber,
        images: [...s.images, ...response.hits],
      }));
      if (pageNumber * 12 > totalHits) {
        this.setState({
          isButtonLoad: false,
        });
      }
      this.setState({ loader: false });
    } catch (error) {
      this.setState({ error: error.message, status: Status.REJECTED });
    }
  };

  render() {
    const { status, images, isButtonLoad, loader } = this.state;
    const { handleSearch, onClickLoad } = this;
    return (
      <Container>
        <Searchbar onSubmit={handleSearch} />
        {status === 'idle' && <Text>Enter a keyword and click search</Text>}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} />
            {loader && (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#9fa9b5"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                wrapperClassName=""
                visible={true}
              />
            )}
          </>
        )}
        {status === 'pending' && (
          <MagnifyingGlass
            visible={true}
            height="200"
            width="200"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#fff"
            color="#9fa9b5"
          />
        )}
        {status === 'rejected' && (
          <>
            <Text>Sorry something went wrong!</Text>
            <Text>Error: {this.state.error}</Text>
          </>
        )}
        {isButtonLoad && <Button onClickLoad={onClickLoad} />}
      </Container>
    );
  }
}
