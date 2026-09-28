import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons';
import styles from '../../assets/styles/styles';
import WorkspaceBottomNav from './WorkspaceBottomNav';

/**
 * WorkspaceDashboardView (Home Page)
 * Matches the SyncDesk Home Screen reference design:
 * - Top header with hamburger menu, workspace pill switcher, and search
 * - 'Welcome back, Alex' headline
 * - Dark teal workspace hero banner card with organic waves & member avatars stack
 * - 'Continue conversations' channel list with timestamps & recent messages
 * - 'Quick actions' 3-card row
 * - Preserved bottom navigation bar
 *
 * @param {Object} props
 * @param {string} [props.workspaceName='Engineering Team'] - Active workspace name
 * @param {string} [props.userName='Alex'] - User display name
 * @param {Function} [props.onChannelPress] - Channel press handler
 */
export default function WorkspaceDashboardView({
  workspaceName = 'Engineering Team',
  userName = 'Alex',
  onChannelPress,
}) {
  const [activeTab, setActiveTab] = useState('Home');

  const conversations = [
    {
      id: '1',
      name: 'General',
      time: '10:24 AM',
      lastMessage: 'Maya: Great progress on the API fix!',
      iconBg: '#1D3F3D',
    },
    {
      id: '2',
      name: 'Backend team',
      time: '9:42 AM',
      lastMessage: 'Jordan: Deployed to staging ✅',
      iconBg: '#5A837E',
    },
    {
      id: '3',
      name: 'Design review',
      time: 'Yesterday',
      lastMessage: 'Riley: Added the latest mockups',
      iconBg: '#B89F7D',
    },
  ];

  const quickActions = [
    {
      id: '1',
      title: 'New channel',
      subtitle: 'Start a channel',
      isPlus: true,
    },
    {
      id: '2',
      title: 'Join workspace',
      subtitle: 'Find a team',
      icon: icons.flowWorkspace,
    },
    {
      id: '3',
      title: 'Invite team',
      subtitle: 'Grow together',
      icon: icons.members,
    },
  ];

  return (
    <View style={[styles.flex1, { backgroundColor: '#F5EFE6', justifyContent: 'space-between' }]}>
      <ScrollView
        contentContainerStyle={[styles.pdh16, styles.pdb32, { paddingTop: 6 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Top Bar: Hamburger Menu | Workspace Capsule | Search */}
        <View
          style={[
            styles.rowBetween,
            styles.pdv8,
            styles.mb14,
            { alignItems: 'center' },
          ]}
        >
          {/* Hamburger Menu Icon */}
          <Pressable
            style={({ pressed }) => [
              styles.center,
              styles.pd4,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <View style={{ gap: 4, width: 22 }}>
              <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 20 }} />
              <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 14 }} />
              <View style={{ backgroundColor: '#132B2C', borderRadius: 2, height: 2.2, width: 18 }} />
            </View>
          </Pressable>

          {/* Workspace Pill Switcher */}
          <Pressable
            style={({ pressed }) => [
              styles.rowCenter,
              styles.pdv6,
              styles.pdh12,
              {
                backgroundColor: '#EAE3D4',
                borderRadius: 22,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => {}}
          >
            <Image
              source={icons.flowWorkspace}
              style={[
                styles.mr6,
                {
                  height: 15,
                  width: 15,
                },
              ]}
              resizeMode="contain"
              tintColor="#132B2C"
            />
            <Text
              style={[
                styles.ts13,
                styles.bold,
                styles.mr4,
                {
                  color: '#132B2C',
                },
              ]}
            >
              {workspaceName}
            </Text>
            <Text
              style={{
                color: '#132B2C',
                fontSize: 12,
                fontWeight: '700',
              }}
            >
              ⌄
            </Text>
          </Pressable>

          {/* Search Icon */}
          <Pressable
            style={({ pressed }) => [
              styles.center,
              styles.pd4,
              {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Text
              style={{
                color: '#132B2C',
                fontSize: 19,
              }}
            >
              🔍
            </Text>
          </Pressable>
        </View>

        {/* 2. Greeting Headline */}
        <View style={styles.mb18}>
          <Text
            style={[
              styles.ts28,
              styles.bold,
              {
                color: '#132B2C',
                fontSize: 27,
                letterSpacing: -0.5,
                lineHeight: 33,
              },
            ]}
          >
            Welcome back,{'\n'}{userName}
          </Text>
        </View>

        {/* 3. Dark Teal Hero Banner Card */}
        <View
          style={[
            styles.pd16,
            styles.mb24,
            {
              backgroundColor: '#1B3E3C',
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
            },
          ]}
        >
          {/* Layered curved graphic shapes */}
          <View
            style={{
              borderColor: '#264E4B',
              borderRadius: 130,
              borderWidth: 26,
              bottom: -50,
              height: 260,
              opacity: 0.45,
              position: 'absolute',
              right: -35,
              width: 260,
            }}
          />
          <View
            style={{
              borderColor: '#2F5C59',
              borderRadius: 100,
              borderWidth: 20,
              bottom: -30,
              height: 200,
              opacity: 0.35,
              position: 'absolute',
              right: -20,
              width: 200,
            }}
          />

          {/* Workspace Tag & Title */}
          <Text
            style={[
              styles.ts11,
              styles.bold,
              styles.mb6,
              {
                color: '#9DBBB7',
                letterSpacing: 1.1,
                textTransform: 'uppercase',
              },
            ]}
          >
            YOUR WORKSPACE
          </Text>

          <Text
            style={[
              styles.ts22,
              styles.bold,
              styles.mb14,
              {
                color: '#FFFFFF',
                letterSpacing: -0.3,
              },
            ]}
          >
            {workspaceName}
          </Text>

          {/* Members Avatar Stack & Action Arrow */}
          <View style={[styles.rowBetween, { alignItems: 'flex-end' }]}>
            <View>
              {/* Overlapping Avatars */}
              <View style={[styles.row, styles.mb6]}>
                {[
                  { bg: '#C59A6D', label: '👨🏽' },
                  { bg: '#708E88', label: '👩🏻' },
                  { bg: '#A6926B', label: '👱🏼' },
                  { bg: '#8B6F58', label: '👩🏾' },
                ].map((avatar, idx) => (
                  <View
                    key={`avatar-${idx}`}
                    style={[
                      styles.center,
                      {
                        backgroundColor: avatar.bg,
                        borderColor: '#1B3E3C',
                        borderRadius: 15,
                        borderWidth: 2,
                        height: 30,
                        marginLeft: idx === 0 ? 0 : -8,
                        width: 30,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 13 }}>{avatar.label}</Text>
                  </View>
                ))}

                {/* +8 Count badge */}
                <View
                  style={[
                    styles.center,
                    {
                      backgroundColor: '#264E4B',
                      borderColor: '#1B3E3C',
                      borderRadius: 15,
                      borderWidth: 2,
                      height: 30,
                      marginLeft: -8,
                      width: 30,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: '700',
                    }}
                  >
                    +8
                  </Text>
                </View>
              </View>

              <Text
                style={[
                  styles.ts12,
                  styles.regular,
                  {
                    color: '#CCDCD9',
                  },
                ]}
              >
                12 members
              </Text>
            </View>

            {/* Circular Arrow Button */}
            <Pressable
              style={({ pressed }) => [
                styles.center,
                {
                  backgroundColor: '#2A5452',
                  borderRadius: 20,
                  height: 40,
                  opacity: pressed ? 0.75 : 1,
                  width: 40,
                },
              ]}
              onPress={() => {}}
              accessibilityRole="button"
              accessibilityLabel="Enter workspace"
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 18,
                  fontWeight: '700',
                }}
              >
                →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 4. Continue Conversations Section */}
        <View style={styles.mb24}>
          <View style={[styles.rowBetween, styles.mb12, { alignItems: 'center' }]}>
            <Text
              style={[
                styles.ts18,
                styles.bold,
                {
                  color: '#132B2C',
                  fontSize: 17,
                },
              ]}
            >
              Continue conversations
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.pd4,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => {}}
            >
              <Text
                style={[
                  styles.ts13,
                  styles.bold,
                  {
                    color: '#1E4C49',
                  },
                ]}
              >
                See all
              </Text>
            </Pressable>
          </View>

          {/* Conversation Channel Items */}
          <View style={{ gap: 10 }}>
            {conversations.map((item) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.rowBetween,
                  styles.pd12,
                  {
                    alignItems: 'center',
                    backgroundColor: '#EBE4D6',
                    borderRadius: 16,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}
                onPress={() => onChannelPress && onChannelPress(item)}
              >
                <View style={[styles.row, styles.flex1, { alignItems: 'center' }]}>
                  {/* Channel Hash Badge */}
                  <View
                    style={[
                      styles.center,
                      styles.mr12,
                      {
                        backgroundColor: item.iconBg,
                        borderRadius: 18,
                        height: 36,
                        width: 36,
                      },
                    ]}
                  >
                    <Image
                      source={icons.flowChannelHash}
                      style={{
                        height: 16,
                        width: 16,
                      }}
                      resizeMode="contain"
                      tintColor="#FFFFFF"
                    />
                  </View>

                  {/* Channel Details */}
                  <View style={styles.flex1}>
                    <View style={styles.rowBetween}>
                      <Text
                        style={[
                          styles.ts15,
                          styles.bold,
                          {
                            color: '#132B2C',
                            fontSize: 15,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[
                          styles.ts11,
                          styles.regular,
                          {
                            color: '#8A9995',
                            fontSize: 11,
                          },
                        ]}
                      >
                        {item.time}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.ts13,
                        styles.regular,
                        styles.mt2,
                        {
                          color: '#687E7B',
                          fontSize: 12.5,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {item.lastMessage}
                    </Text>
                  </View>
                </View>

                {/* Right Chevron */}
                <Text
                  style={[
                    styles.ml10,
                    {
                      color: '#8A9995',
                      fontSize: 18,
                      fontWeight: '500',
                    },
                  ]}
                >
                  ›
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 5. Quick Actions Section */}
        <View>
          <Text
            style={[
              styles.ts18,
              styles.bold,
              styles.mb12,
              {
                color: '#132B2C',
                fontSize: 17,
              },
            ]}
          >
            Quick actions
          </Text>

          {/* 3 Quick Action Cards */}
          <View style={[styles.rowBetween, { gap: 8 }]}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={({ pressed }) => [
                  styles.flex1,
                  styles.center,
                  styles.pd12,
                  {
                    backgroundColor: '#EBE4D6',
                    borderRadius: 16,
                    minHeight: 112,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
                onPress={() => {}}
              >
                {/* Action Icon Circle */}
                <View
                  style={[
                    styles.center,
                    styles.mb8,
                    {
                      backgroundColor: '#132B2C',
                      borderRadius: 18,
                      height: 36,
                      width: 36,
                    },
                  ]}
                >
                  {action.isPlus ? (
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 20,
                        fontWeight: '600',
                        lineHeight: 22,
                      }}
                    >
                      +
                    </Text>
                  ) : (
                    <Image
                      source={action.icon}
                      style={{
                        height: 18,
                        width: 18,
                      }}
                      resizeMode="contain"
                      tintColor="#FFFFFF"
                    />
                  )}
                </View>

                {/* Title & Subtitle */}
                <Text
                  style={[
                    styles.ts13,
                    styles.bold,
                    styles.mb2,
                    {
                      color: '#132B2C',
                      fontSize: 12.5,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {action.title}
                </Text>
                <Text
                  style={[
                    styles.ts11,
                    styles.regular,
                    {
                      color: '#687E7B',
                      fontSize: 11,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {action.subtitle}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 6. Preserved User Footer / Bottom Navigation Bar */}
      <WorkspaceBottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
}

