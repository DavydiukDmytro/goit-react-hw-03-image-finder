import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { getImages } from 'services/api';
import { ImageGallery } from 'components/ImageGallery';
import { Container } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    images: {},
    search: '',
    page: 1,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      try {
        const images = await getImages(search, page);
        this.setState({
          images: images.hits,
          status: Status.RESOLVED,
        });
      } catch (error) {
        console.log('gg', error);
      }
    }
  }

  handleSearch = searchWord => {
    this.setState({ search: searchWord });
  };

  render() {
    const { status, images } = this.state;
    const { handleSearch } = this;
    return (
      <Container>
        <Searchbar onSubmit={handleSearch} />
        {status === 'idle' && <p>Введіть слово пошуку</p>}
        {status === 'resolved' && <ImageGallery images={images} />}
      </Container>
    );
  }
}
