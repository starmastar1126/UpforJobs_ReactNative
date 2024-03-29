import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { login } from "@modules/auth/actions";
import { Loading, Background, AthenaButton, AthenaInput } from "@components";
import { isEmpty, validateEmail } from "@utils/functions";
import configs from "@constants/configs";
import { themes, colors } from "@constants/themes";
import { images, icons, dummy } from "@constants/assets";
import axios, { setClientToken } from "@utils/axios";
import i18n from "@utils/i18n";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      error: '',
    };
  }

  onSubmit() {
    const { user_type } = this.props.route.params;
    if (isEmpty(this.state.email) || !validateEmail(this.state.email)) {
      this.setState({ email: "Enter correct email", error: "E.g, example@gmail.com" });
    } else {
      this.props.navigation.navigate('Verify', { user_type: user_type });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Loading loading={this.state.loading} />
        <Background background={images.background} />
        <View style={styles.main}>
          <TouchableOpacity style={{ position: 'absolute', top: Platform.OS == 'ios' ? 57 : 27, left: Platform.OS == 'ios' ? 37 : 27 }} onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" type="feather" size={25} color={colors.WHITE} />
          </TouchableOpacity>
          <View style={styles.topView}>
            <Text style={styles.title}>{"Enter Your\nEmail Address"}</Text>
          </View>
          <View style={styles.bottomView}>
            <AthenaInput
              width={300}
              height={50}
              radius={25}
              borderWidth={isEmpty(this.state.error) ? 0 : 2}
              borderColor={colors.RED.DEFAULT}
              backgroundColor={colors.WHITE}
              fontSize={17}
              fontWeight="300"
              fontColor={colors.WHITE}
              value={this.state.email}
              error={this.state.error}
              keyboardType="email-address"
              onChangeText={(email) => {
                isEmpty(this.state.error) ? this.setState({ email, error: '' }) : this.setState({ email: '', error: '' });
              }}
            />
            <AthenaButton
              marginTop={Platform == 'ios' ? 50 : 30}
              width={250}
              height={50}
              radius={25}
              backgroundColor={colors.GREEN.PRIMARY}
              title="Submit"
              fontSize={26}
              fontWeight="bold"
              fontColor={colors.WHITE}
              onPress={() => this.onSubmit()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%')
  },
  topView: {
    position: 'absolute',
    bottom: hp('50%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: wp('100%'),
  },
  title: {
    marginBottom: 48,
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'center',
    lineHeight: 50
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: wp('100%'),
    height: hp('50%'),
  }
});

export default connect(undefined, undefined)(SignUp);
