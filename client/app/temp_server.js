const express = require('express');

express().use(express.static(__dirname + '/build')).listen(5000, () => console.log('server up'));
