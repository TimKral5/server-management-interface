# Views

## Dashboard

The dashboard gives an overview for all other views.

### Wireframe
```plain
<article>:
+-------------------------------------------+
| Dashboard                                 |
| +-----------+ +-----------+ +-----------+ |
| |CPU        | |Memory     | |GPU        | |
| |           | |           | |           | |
| +-----------+ +-----------+ +-----------+ |
| +-----------+ +-----------+ +-----------+ |
| |Disks      | |Service    | |Containers | |
| |           | |           | |           | |
| +-----------+ +-----------+ +-----------+ |
| +-----------+ +-----------+ +-----------+ |
| |Disks      | |Service    | |Disks      | |
| |           | |           | |           | |
| +-----------+ +-----------+ +-----------+ |
+-------------------------------------------+
```

## Services

The services view is an overview over all system services and their
status.

Following data is displayed:

 - Service Name
 - Service Description
 - Service Status
 - Service Autostart Configuration

### Wireframe
```plain
<article>:
+-------------------------------------------+
| Services                                  |
| +-----+--------------+-------+----------+ |
| |Name |Description   |Status |Autostart | |
| +=====+==============+=======+==========+ |
| |S1   |Some Service  |Running|Enabled   | |
| |S2   |Some Service 2|Crashed|Disable   | |
| +-----+--------------+-------+----------+ |
|                                           |
|                                           |
+-------------------------------------------+
```

## Containers

The container view shows similar information as the service view,
but for containers.

### Wireframe
```plain
<article>:
+-------------------------------------------+
| Services                                  |
| +-----+------+------------------+-------+ |
| |Name |Type  |Description       |Status | |
| +=====+=====+===================+=======+ |
| |C1   |Type1 |Some Container 1  |Up     | |
| |C2   |Type2 |Some Container 2  |Down   | |
| +-----+--------------+-------+----------+ |
|                                           |
|                                           |
+-------------------------------------------+
```

## Configuration

The configuration view displays an overview of all the available
options and shows prompts for all the available actions.

Following configurations are possible:
 
 - Crontab
 - Network
 - NGinX
 - SSH

### Wireframe
```plain
<article>:
+-------------------------------------------+
| Configuration                             |
| +-----------+ +-----------+ +-----------+ |
| |Crontab    | |Network    | |NGinX      | |
| |           | |           | |           | |
| +-----------+ +-----------+ +-----------+ |
| +-----------+                             |
| |SSH        |                             |
| |           |                             |
| +-----------+                             |
+-------------------------------------------+
```

## Details

### Wireframe

//