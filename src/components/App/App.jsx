import { Component } from 'react';
import { Searchbar } from 'components/Searchbar';
import { getImages } from 'services/api';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Container } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    response: {},
    search: '',
    page: 1,
    isButtonLoad: false,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search) {
      try {
        const response = await getImages(search, page);
        if (response.totalHits > 12) {
          this.setState({
            isButtonLoad: true,
          });
        }
        this.setState({
          response,
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

  onClickLoad = async () => {
    const { search, page } = this.state;
    this.setState(s => ({ page: s.page + 1 }));
    try {
      const response = await getImages(search, page);
      this.setState(s => ({ response }));
    } catch (error) {
      console.log('gg', error);
    }
  };

  render() {
    const { status, response, isButtonLoad } = this.state;
    const images = response.hits;
    const { handleSearch, onClickLoad } = this;
    return (
      <Container>
        <Searchbar onSubmit={handleSearch} />
        {status === 'idle' && <p>Введіть слово пошуку</p>}
        {status === 'resolved' && <ImageGallery images={images} />}
        {isButtonLoad && <Button onClickLoad={onClickLoad} />}
      </Container>
    );
  }
}
