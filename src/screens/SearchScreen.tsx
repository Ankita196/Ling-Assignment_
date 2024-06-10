import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, initializePeople } from '../redux/actions';
import { RootState } from '../redux/store';

const SearchScreen = () => {
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState<'bananas' | 'name' | 'lowest' | 'fuzzy'>('bananas');
    const username = useSelector((state: RootState) => state.user.username);
    const people = useSelector((state: RootState) => state.user.people);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializePeople());
    }, [dispatch]);

    const handleSearch = () => {
        const user = people.find(person => person.name.toLowerCase() === searchInput.toLowerCase());
        if (!user) {
            Alert.alert("Error", "This user name does not exist! Please specify an existing user name!");
        } else {
            dispatch(setUsername(user.name));
        }
    };

    let sortedPeople = [...people];

    switch (sortBy) {
        case 'name':
            sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'lowest':
            sortedPeople.sort((a, b) => a.bananas - b.bananas || a.name.localeCompare(b.name));
            break;
        case 'fuzzy':
            sortedPeople = sortedPeople.filter(person =>
                person.name.toLowerCase().includes(searchInput.toLowerCase())
            ).sort((a, b) => b.bananas - a.bananas);
            break;
        case 'bananas':
        default:
            sortedPeople.sort((a, b) => b.bananas - a.bananas);
            break;
    }

    const topTenPeople = sortedPeople.slice(0, 10);
    const userInTopTen = topTenPeople.find(person => person.name === username);

    if (!userInTopTen && sortBy === 'bananas') {
        const user = sortedPeople.find(person => person.name === username);
        if (user) {
            topTenPeople.pop();
            topTenPeople.push(user);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={require('../assets/images/search.png')} style={styles.image} />
            </View>
            <View style={styles.searchContainer}>

                <TextInput
                    value={searchInput}
                    onChangeText={setSearchInput}
                    placeholder="Enter username"
                    style={styles.input}
                    placeholderTextColor={'grey'}
                />

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.gridtext}> Sort the list by</Text>
            <View style={styles.sortContainer}>
                <TouchableOpacity style={[styles.sortButton, sortBy === 'bananas' && styles.activeButton]} onPress={() => setSortBy('bananas')}>
                    <Text style={styles.sortButtonText}>Bananas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortButton, sortBy === 'name' && styles.activeButton]} onPress={() => setSortBy('name')}>
                    <Text style={styles.sortButtonText}>Name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortButton, sortBy === 'lowest' && styles.activeButton]} onPress={() => setSortBy('lowest')}>
                    <Text style={styles.sortButtonText}>Lowest Ranked</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortButton, sortBy === 'fuzzy' && styles.activeButton]} onPress={() => setSortBy('fuzzy')}>
                    <Text style={styles.sortButtonText}>Fuzzy</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={topTenPeople}
                keyExtractor={(item) => item.uid}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <View style={[styles.item, item.name === username ? styles.highlight : null]}>
                        <Text style={styles.gridtext}>Rank: {index + 1}</Text>
                        <Text style={styles.gridtext}>Name: {item.name?.length > 0 ? item.name : 'not available'}</Text>
                        <Text style={styles.gridtext}>Bananas: {item.bananas}</Text>
                    </View>
                )}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginRight: 10,
        color: 'grey',
        paddingLeft: 35,
        fontWeight: 'bold',
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    sortButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#83dbee',
        borderRadius: 5,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#9af4d7',
    },
    sortButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    highlight: {
        backgroundColor: '#FFFFE0',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    gridtext: {
        color: 'grey',
        fontWeight: 'bold',

    },
    image: { height: 20, width: 20, },
    imageView: { position: 'absolute', top: 34, left: 30, zIndex: 1 }
});

export default SearchScreen;
