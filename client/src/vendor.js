/*
This file contains references to vendor libraries we're using in this
project. This is used by webpack in the production build only.
A separate bundle for vendor code is useful since it's unlikely to
change as often as the application's code. So all the libraries we
reference here will be written to vendor.js so they can cached until
one of them change. So basically, this is a form of bundle splitting
and any files that are not referenced here will be bundles into main.js
for the production build.
*/

/* eslint-disable no-unused-vars */

import 'core-js/stable';
