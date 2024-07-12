# Grid

The grid component is used to dynamically distribute a set of items
throughout the screen.

It organizes it's items, so that they comply with a set minimal
width.

To use the grid component, add the `awi-grid` class onto an element.

## Usage

```html
<ul class="awi-grid">
   <li></li>
</ul>
```

## Wireframes
```plain
Examples:

Item:
+--------+
| Item 1 |
|        |
+--------+

Tripple-Width:
+----------------------------------+
| +--------+ +--------+ +--------+ |
| | Item 1 | | Item 2 | | Item 3 | |
| |        | |        | |        | |
| +--------+ +--------+ +--------+ |
| +--------+                       |
| | Item 4 |                       |
| |        |                       |
| +--------+                       |
+----------------------------------+

Douple-Width:
+-----------------------+
| +--------+ +--------+ |
| | Item 1 | | Item 2 | |
| |        | |        | |
| +--------+ +--------+ |
| +--------+ +--------+ |
| | Item 3 | | Item 4 | |
| |        | |        | |
| +--------+ +--------+ |
+-----------------------+

Single-Width:
+------------+
| +--------+ |
| | Item 1 | |
| |        | |
| +--------+ |
| +--------+ |
| | Item 2 | |
| |        | |
| +--------+ |
| +--------+ |
| | Item 3 | |
| |        | |
| +--------+ |
| +--------+ |
| | Item 4 | |
| |        | |
| +--------+ |
+------------+
```