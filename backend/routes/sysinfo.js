
import { RouteContext, express } from "../context.js";
const app = express();


/** @type {RouteContext} */
let ctx;

app.get("/static_info", (req, res) => {
   
});

/**
 * @param {RouteContext} _ctx 
 */
export default function hook(route, _ctx) {
   ctx = _ctx;
   ctx.app.use(route, app);
};