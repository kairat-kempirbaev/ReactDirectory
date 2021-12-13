import React, { Component } from 'react'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: null,
            query: { page: 0, limit: 25 }
        };
    };

    objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    componentDidMount() {
        let query = `demo/all?${this.objToQueryString(this.state.query)}`
        fetch(query)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        items: null,
                        error
                    });
                }
            )
    };

    render() {
        const style = {
            "list-style-type": 'none',
        };

        const { items, error, isLoaded } = this.state;
        if (!isLoaded) {
            return <p>Loading ...</p>;
        }
        return (
            <table className="center w-75 table text-center rounded table-striped">
                <thead>
                    <tr>
                        <th scope="col">Record #</th>
                        <th scope="col">Title</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Director</th>
                        <th scope="col">Stars</th>
                        <th scope="col">Genres</th>
                        <th scope="col">Year</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.rating ? item.rating.rating : 0}</td>
                            <td>{item.director}</td>

                            <td>
                                <ul style={style}>
                                    {item.stars.slice(0, 3).map((nested_item) => <li key={item.id + "-" + nested_item.id}  >{nested_item.name}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul style={style}>
                                    {item.genres.map((nested_item) => <li key={item.id + "-" + nested_item.id} >{nested_item.name}</li>)}
                                </ul>
                            </td>
                            <td>{item.year}</td>
                        </tr>)}
                </tbody>
            </table>
        )
    }
}
export default Movies;