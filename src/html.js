import { escape } from './escape.js';

const htmlFactory = (safe = true) => (literalSections, ...substs) => {
    let raw = literalSections.raw;
    let result = '';
    substs.forEach((subst, i) => {
      let lit = raw[i];
      if (Array.isArray(subst)) {
        subst = subst.join('');
      }
      if (safe) {
        subst = escape(subst);
        lit = lit.slice(0, -1);
      }
      result += lit;
      result += subst;
    });
    result += raw[raw.length - 1]; 
    return result;
};
export const html = htmlFactory();
export const unsafeHtml = htmlFactory(false);
