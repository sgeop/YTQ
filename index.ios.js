/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  View
} from 'react-native';


var REQUEST_URL = 'http://localhost:5300/api/search?q=eminem'

class YTQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      searchString: ''
    };
  }
  componentDidMount() {
    // this.fetchData();
    console.log("testttttttt");
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("res " + responseData)
        console.log("TJIS: " + this.state);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true
        });
      })
      .done();
  }

  hello() {
    console.log(this.state)
  }

  render() {
    if (!this.state.loaded) {
      return this.renderInitView();
    }
    
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderSong}
        style={styles.listView}
      />
    );
  }

  renderInitView() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for an artist or song!
        </Text>
        <View style={styles.flowRight}>
          <TextInput style={styles.searchInput} value={this.state.searchString}/>
          <TouchableHighlight style={styles.button} onPress={this.fetchData.bind(this)}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.rowContainer}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderSong(song) {
    return (
      <View style={styles.rowContainer}>
        <Image
        source={{uri: song.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{song.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('YTQ', () => YTQ);
