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
        const { items, error, isLoaded } = this.state;
        if (!isLoaded) {
            return <p>Loading ...</p>;
        }
        return (
            <table className="center w-75 table text-center rounded">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Stars</th>
                        <th>Genres</th>
                        <th>Rating</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map((item) =>
                        <tr key={item.id}>
                            <td>${item.title}</td>
                            <td>${item.director}</td>
                            <td>${item.year}</td>
                        </tr>)}
                </tbody>
            </table>
        )
    }
}
export default Movies;