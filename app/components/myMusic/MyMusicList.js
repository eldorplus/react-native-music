'use strict';
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * 个人卡片
 */
class PersonCard extends Component {
    render() {
        return (
            <View style={pc_styles.container}>
                <View style={pc_styles.left_wrapper}>
                    <View style={pc_styles.head_img_wrapper}>
                        <Image
                            source={{uri:'http://www.softwhy.com/uc_server/avatar.php?uid=857&size=middle'}}
                            style={pc_styles.head_img}/>
                    </View>

                    <Text style={pc_styles.nickname}>_关键</Text>
                </View>
                <View style={styles.right_wrapper}>
                    <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>
                </View>
            </View>
        )
    }
}
const pc_styles = StyleSheet.create({
    container: {
        height: 60,
        paddingLeft: 14,
        //paddingRight:14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 14,
    },
    left_wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head_img_wrapper: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: '#ccc',
        backgroundColor: '#F2F2F2',
        overflow: 'hidden',
    },
    head_img: {
        height: 40,
        width: 40,
    },
    nickname: {
        fontSize: 18,
        color: '#333',
        marginLeft: 6,
    },
    right_wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


class MyItems extends Component {
    render() {
        return (
            <View style={my_item_styles.container}>
                <View style={my_item_styles.items}>
                    <Icon name="music" size={26} color="green" style={my_item_styles.icon}/>
                    <View style={my_item_styles.text_wrapper}>
                        <Text style={my_item_styles.text}>本地歌曲</Text>
                        <View style={my_item_styles.right_wrapper}>
                            <Text style={my_item_styles.num}>14</Text>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>
                        </View>
                    </View>
                </View>
                <View style={my_item_styles.items}>
                    <Icon name="download" size={26} color="green" style={my_item_styles.icon}/>
                    <View style={my_item_styles.text_wrapper}>
                        <Text style={my_item_styles.text}>我的下载</Text>
                        <View style={my_item_styles.right_wrapper}>
                            <Text style={my_item_styles.num}>2</Text>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>
                        </View>
                    </View>
                </View>
                <View style={my_item_styles.items}>
                    <Icon name="circle-o-notch" size={26} color="green" style={my_item_styles.icon}/>
                    <View style={my_item_styles.text_wrapper}>
                        <Text style={my_item_styles.text}>最近播放</Text>
                        <View style={my_item_styles.right_wrapper}>
                            <Text style={my_item_styles.num}>104</Text>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>
                        </View>
                    </View>
                </View>
                <View style={my_item_styles.items}>
                    <Icon name="heart-o" size={26} color="#d0021b" style={my_item_styles.icon}/>
                    <View style={[my_item_styles.text_wrapper,{borderBottomWidth:0}]}>
                        <Text style={my_item_styles.text}>最近播放</Text>
                        <View style={my_item_styles.right_wrapper}>
                            <Text style={my_item_styles.num}>19</Text>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const my_item_styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 14,
        marginBottom: 14,
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
    },
    icon: {
        width: 40,
    },
    text_wrapper: {
        flex: 1,
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#F7F7F7'
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    right_wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    num: {
        fontSize: 16,
        color: '#9b9b9b'
    }
});


/**
 *  个性电台
 */
class PersonRadio extends Component {
    render() {
        return (
            <View style={pr_styles.container}>
                <View style={pr_styles.play_wrapper}>
                    <Icon name="play" size={18} color="white"/>
                </View>
                <View style={pr_styles.text_wrapper}>
                    <Text style={pr_styles.title}>个性电台</Text>
                    <Text style={pr_styles.attr}>来听听和[单车]一样好听的歌曲吧</Text>
                </View>
            </View>
        )
    }
}
const pr_styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    play_wrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#9b9b9b',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_wrapper: {
        marginLeft: 8,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: '#333'
    },
    attr: {
        marginTop: 4,
        fontSize: 12,
        color: '#666'
    }

});

class AlbumsList extends Component {
    render() {
        return (
            <View style={al_style.container}>
                <View style={al_style.header}>
                    <Text style={al_style.header_title}>我的歌单</Text>
                </View>
                <View style={al_style.item_wrapper}>
                    <View style={al_style.item}>
                        <View style={al_style.album_img}>
                        </View>
                        <View style={al_style.album_info}>
                            <View>
                                <Text style={al_style.album_name}>举高只手演嘢会Live</Text>
                                <Text style={al_style.album_num}>20首</Text>
                            </View>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>

                        </View>
                    </View>
                    <View style={[al_style.item,{borderBottomWidth:0}]}>
                        <View style={al_style.album_img}>
                        </View>
                        <View style={al_style.album_info}>
                            <View>
                                <Text style={al_style.album_name}>奇迹</Text>
                                <Text style={al_style.album_num}>15首</Text>
                            </View>
                            <Icon.Button name="angle-right" size={22} color="#9b9b9b" backgroundColor="transparent"/>

                        </View>
                    </View>
                </View>
                <View style={al_style.footer}>
                    <Text style={al_style.footer_title}>查看全部></Text>
                </View>
            </View>
        )
    }
}

const al_style = StyleSheet.create({
    container: {},
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F7F7F7',
        backgroundColor: 'white',

    },
    header_title: {
        fontSize: 18,
        color: '#333',
        letterSpacing: 4,
    },
    item_wrapper: {
        paddingLeft: 14,
        backgroundColor: 'white',

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 76,
    },
    album_img: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
        marginRight: 8,
    },
    album_info: {
        flex: 1,
        height: 76,
        borderBottomWidth: 1,
        borderColor: '#F7F7F7',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    album_name: {
        fontSize: 16,
        color: '#333',
    },
    album_num: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    footer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    footer_title: {
        fontSize: 16,
        color: '#666',
    }
});

export default class MyMusicList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <PersonCard/>
                <MyItems/>
                <PersonRadio/>
                <AlbumsList/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});