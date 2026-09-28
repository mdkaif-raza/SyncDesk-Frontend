import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TasksHeader,
  TasksStats,
  TasksTabControl,
  TaskCard,
} from '../../components/tasks';
import { Footer } from '../../components/footer';
import { colors } from '../../assets/colors/colors';

/**
 * TasksScreen
 * Team tasks and assigned work tracker screen.
 * Soft layered white/off-white palette with dark teal accents.
 */
export default function TasksScreen({
  workspaceName = 'Engineering Team',
  onNavigateTab,
}) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('my_tasks');

  // Initial tasks state matching visual reference
  const [taskList, setTaskList] = useState([
    {
      id: 'task-1',
      title: 'Complete authentication testing',
      description: 'Run full test suite and verify auth flow across all environments.',
      assignee: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      category: '#backend',
      dueDate: 'Due today',
      priority: 'High',
      completed: false,
      showActions: true,
      tabOwner: 'my_tasks',
    },
    {
      id: 'task-2',
      title: 'Review frontend dashboard',
      description: 'Check UI, performance and responsive behavior across devices.',
      assignee: {
        name: 'David Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      },
      category: '#frontend',
      dueDate: 'Tomorrow',
      priority: 'Medium',
      completed: false,
      showActions: false,
      tabOwner: 'my_tasks',
    },
    {
      id: 'task-3',
      title: 'Prepare sprint notes',
      description: 'Summarize progress, blockers and next steps for the team.',
      assignee: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      },
      category: '#general',
      dueDate: 'Sep 24',
      priority: 'Low',
      completed: false,
      showActions: false,
      tabOwner: 'my_tasks',
    },
    {
      id: 'task-4',
      title: 'Complete authentication testing',
      description: 'Run full test suite and verify auth flow across all environments.',
      assignee: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      category: '#backend',
      dueDate: 'Due today',
      priority: 'High',
      completed: true,
      showActions: false,
      showCompletionAction: true,
      completionMessage: 'I completed the task: Complete authentication testing.',
      completionTime: '2m ago',
      tabOwner: 'completed',
    },
  ]);

  // Handler to toggle checkbox
  const handleToggleComplete = (taskId) => {
    setTaskList((prev) =>
      prev.map((item) => {
        if (item.id === taskId) {
          const nextCompleted = !item.completed;
          return {
            ...item,
            completed: nextCompleted,
            tabOwner: nextCompleted ? 'completed' : 'my_tasks',
            completionMessage: nextCompleted
              ? item.completionMessage || `I completed the task: ${item.title}`
              : null,
            completionTime: nextCompleted ? 'Just now' : null,
          };
        }
        return item;
      })
    );
  };

  // Handler to mark complete from Card action button
  const handleMarkComplete = (taskId) => {
    handleToggleComplete(taskId);
  };

  // Handler for reporting a problem
  const handleReportProblem = (taskId) => {
    console.log('Report problem for task:', taskId);
  };

  // Handler for sending completion message
  const handleSendCompletionMessage = (taskId) => {
    console.log('Send completion message for task:', taskId);
  };

  // Filter tasks based on selected tab
  const getDisplayedTasks = () => {
    if (activeTab === 'completed') {
      return taskList.filter((item) => item.completed);
    }
    if (activeTab === 'assigned_by_me') {
      return taskList.filter(
        (item) => item.assignee?.name === 'Sarah Johnson' || item.tabOwner === 'assigned_by_me'
      );
    }
    // 'my_tasks' shows all active uncompleted tasks plus reference sample structure
    return taskList;
  };

  // Calculate live statistics
  const openCount = taskList.filter((t) => !t.completed).length;
  const dueTodayCount = taskList.filter(
    (t) => !t.completed && t.dueDate === 'Due today'
  ).length;
  const completedCount = taskList.filter((t) => t.completed).length;

  const displayedTasks = getDisplayedTasks();

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardAvoid,
        { paddingTop: Math.max(insets.top, 14) },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.screenBg} />

      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Page Title & Description */}
          <TasksHeader
            title="Tasks"
            subtitle="Stay on top of your assigned work."
          />

          {/* 2. Horizontal Statistics Cards */}
          <TasksStats
            openCount={openCount}
            dueTodayCount={dueTodayCount}
            completedCount={completedCount}
          />

          {/* 3. Segmented Tab Control */}
          <TasksTabControl
            activeTab={activeTab}
            onTabSelect={setActiveTab}
          />

          {/* 4. Vertically Stacked Task Cards */}
          <View style={styles.taskListContainer}>
            {displayedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onMarkComplete={handleMarkComplete}
                onReportProblem={handleReportProblem}
                onSendCompletionMessage={handleSendCompletionMessage}
              />
            ))}
          </View>
        </ScrollView>

        {/* Footer Navigation */}
        <Footer activeTab="Tasks" onTabChange={onNavigateTab} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  mainContainer: {
    flex: 1,
    justify: 'space-between',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  taskListContainer: {
    marginTop: 2,
  },
});
