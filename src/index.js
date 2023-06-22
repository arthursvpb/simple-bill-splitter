import '@shoelace-style/shoelace/dist/themes/dark.css';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/icon/icon';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button';
import '@shoelace-style/shoelace/dist/components/input/input';
import '@shoelace-style/shoelace/dist/components/rating/rating';
import '@shoelace-style/shoelace/dist/components/card/card';
import '@shoelace-style/shoelace/dist/components/format-number/format-number';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/select/select';
import '@shoelace-style/shoelace/dist/components/option/option';
import '@shoelace-style/shoelace/dist/components/divider/divider';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

import './styles/global.css';

import './components/bs-header';
import './components/bs-page';
import './components/bs-add-user';
import './components/bs-add-expense';

setBasePath('/shoelace');
