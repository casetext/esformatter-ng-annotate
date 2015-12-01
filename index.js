'use strict';

exports.tokenAfter = tokenAfter;

function tokenAfter(token) {
  var prev;
  if (token && token.type === 'LineBreak') {
    prev = token.prev;
    if (prev && prev.type === 'BlockComment' && prev.value.match(/\s*@(?:ngInject|ngNoInject)\s*/)) {
      remove(token);
    }
  }
  if (token && token.type === 'Keyword' && token.value.match(/function/)) {
    prev = token.prev;
    if (prev && prev.type === 'BlockComment' && prev.value.match(/\s*@(?:ngInject|ngNoInject)\s*/)) {
      insertBefore(token, {
        type: 'WhiteSpace',
        value: ' '
      });
    }
  }
}

function insertBefore(target, newToken) {
  newToken.prev = target.prev;
  newToken.next = target;
  if (target.prev) {
    target.prev.next = newToken;
  } else if (target.root) {
    target.root.startToken = newToken;
  }
  target.prev = newToken;
  newToken.root = target.root;
  return newToken;
}

function remove(target) {
  if (target.next) {
    target.next.prev = target.prev;
  } else if (target.root) {
    target.root.endToken = target.prev;
  }

  if (target.prev) {
    target.prev.next = target.next;
  } else if (target.root) {
    target.root.startToken = target.next;
  }
}
