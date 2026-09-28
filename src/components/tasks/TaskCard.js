import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function TaskCard({
  task,
  onToggleComplete,
  onMarkComplete,
  onReportProblem,
  onSendCompletionMessage,
}) {
  const isCompleted = task.completed;

  // Priority Badge colors
  const getPriorityStyle = () => {
    if (isCompleted) {
      return { bg: '#DCFCE7', text: '#15803D' };
    }
    switch (task.priority) {
      case 'High':
        return { bg: '#FEE2E2', text: '#DC2626' };
      case 'Medium':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Low':
        return { bg: '#DCFCE7', text: '#15803D' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const priorityStyle = getPriorityStyle();

  return (
    <View
      style={[
        styles.cardContainer,
        isCompleted ? styles.completedCard : styles.activeCard,
      ]}
    >
      {/* Top Header: Checkbox + Title + Priority Badge */}
      <View style={styles.topRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onToggleComplete && onToggleComplete(task.id)}
          style={styles.checkboxTouchable}
        >
          <View
            style={[
              styles.checkbox,
              isCompleted ? styles.checkboxChecked : styles.checkboxUnchecked,
            ]}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titlePriorityRow}>
            <Text
              style={[
                styles.taskTitle,
                isCompleted && styles.completedTitleText,
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityStyle.bg },
              ]}
            >
              <Text
                style={[
                  styles.priorityBadgeText,
                  { color: priorityStyle.text },
                ]}
              >
                {task.priority || 'High'}
              </Text>
            </View>
          </View>

          {/* Description */}
          {!!task.description && (
            <Text style={styles.taskDescription} numberOfLines={2}>
              {task.description}
            </Text>
          )}

          {/* Assignee Row */}
          <View style={styles.assigneeRow}>
            {task.assignee?.avatar ? (
              <Image
                source={{ uri: task.assignee.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>
                  {task.assignee?.name ? task.assignee.name.charAt(0) : 'U'}
                </Text>
              </View>
            )}
            <Text style={styles.assigneeText}>
              Assigned by{' '}
              <Text style={styles.assigneeName}>
                {task.assignee?.name || 'Sarah Johnson'}
              </Text>
            </Text>
          </View>

          {/* Category Tag & Due Date Badges */}
          <View style={styles.badgesRow}>
            {/* Category badge */}
            <View style={[styles.badgePill, styles.categoryBadge]}>
              <Text style={styles.categoryBadgeIcon}>💬</Text>
              <Text style={styles.categoryBadgeText}>
                {task.category || '#backend'}
              </Text>
            </View>

            {/* Due date badge */}
            <View style={[styles.badgePill, styles.dueDateBadge]}>
              <Text style={styles.dueDateBadgeIcon}>📅</Text>
              <Text style={styles.dueDateBadgeText}>
                {task.dueDate || 'Due today'}
              </Text>
            </View>
          </View>

          {/* Action buttons for Card 1 (Uncompleted with actions) */}
          {task.showActions && !isCompleted && (
            <View style={styles.actionsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onMarkComplete && onMarkComplete(task.id)}
                style={styles.markCompleteBtn}
              >
                <Text style={styles.markCompleteBtnText}>✓ Mark complete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onReportProblem && onReportProblem(task.id)}
                style={styles.reportProblemBtn}
              >
                <Text style={styles.reportProblemBtnText}>
                  💬 Report a problem
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Completed Task extra action button & completion note */}
          {isCompleted && (
            <View style={styles.completedExtraSection}>
              {/* Send completion message button if requested */}
              {task.showCompletionAction !== false && (
                <View style={styles.sendMsgBtnRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      onSendCompletionMessage && onSendCompletionMessage(task.id)
                    }
                    style={styles.sendMsgBtn}
                  >
                    <Text style={styles.sendMsgBtnText}>
                      💬 Send completion message
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Completion Note box */}
              {!!task.completionMessage && (
                <View style={styles.completionNoteBox}>
                  <Text style={styles.completionNoteText} numberOfLines={2}>
                    💬 "{task.completionMessage}"
                  </Text>
                  <Text style={styles.completionTimeText}>
                    {task.completionTime || '2m ago'}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#132B2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  activeCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EAE6DF',
  },
  completedCard: {
    backgroundColor: '#F1F8F5',
    borderColor: '#D1FAE5',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxTouchable: {
    paddingRight: 12,
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justify: 'center',
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#1B4D4F',
    borderColor: '#1B4D4F',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  headerContent: {
    flex: 1,
  },
  titlePriorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 20,
  },
  completedTitleText: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  assigneeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatarImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  avatarFallback: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justify: 'center',
    marginRight: 6,
  },
  avatarFallbackText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  assigneeText: {
    fontSize: 12,
    color: '#64748B',
  },
  assigneeName: {
    color: '#334155',
    fontWeight: '500',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  categoryBadge: {
    backgroundColor: '#E0F2FE',
  },
  categoryBadgeIcon: {
    fontSize: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0284C7',
  },
  dueDateBadge: {
    backgroundColor: '#FFEDD5',
  },
  dueDateBadgeIcon: {
    fontSize: 10,
  },
  dueDateBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EA580C',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
    flexWrap: 'wrap',
  },
  markCompleteBtn: {
    backgroundColor: '#1B4D4F',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  markCompleteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  reportProblemBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reportProblemBtnText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '500',
  },
  completedExtraSection: {
    marginTop: 12,
  },
  sendMsgBtnRow: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  sendMsgBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  sendMsgBtnText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#334155',
  },
  completionNoteBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completionNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    fontStyle: 'italic',
    marginRight: 8,
  },
  completionTimeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
});
