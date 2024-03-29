# 限制容器能使用的 CPU 核数

`--cpus` 后面跟着一个浮点数，代表容器最多使用的核数，可以精确到小数点二位，也就是说容器最小可以使用 `0.01` 核 CPU。比如，我们可以限制容器只能使用 `1.5` 核数 CPU：

如果设置的 `--cpus` 值大于主机的 CPU 核数，docker 会直接报错：

如果多个容器都设置了 `--cpus` ，并且它们之和超过主机的 CPU 核数，并不会导致容器失败或者退出，这些容器之间会竞争使用 CPU，具体分配的 CPU 数量取决于主机运行情况和容器的 CPU share 值。也就是说 `--cpus` 只能保证在 CPU 资源充足的情况下容器最多能使用的 CPU 数，docker 并不能保证在任何情况下容器都能使用这么多的 CPU（因为这根本是不可能的）。

现在的笔记本和服务器都会有多个 CPU，docker 也允许调度的时候限定容器运行在哪个 CPU 上。比如，我的主机上有 4 个核，可以通过 `--cpuset` 参数让容器只运行在前两个核上：

```bash
docker run --rm -it --cpuset-cpus=0,1 stress --cpu 2
```

`--cpuset-cpus` 参数可以和 `-c --cpu-shares` 一起使用，限制容器只能运行在某些 CPU 核上，并且配置了使用率。

限制容器运行在哪些核上并不是一个很好的做法，因为它需要实现知道主机上有多少 CPU 核，而且非常不灵活。除非有特别的需求，一般并不推荐在生产中这样使用。

# 内存资源

**默认情况下，docker 并没有对容器内存进行限制**，也就是说容器可以使用主机提供的所有内存。这当然是非常危险的事情，如果某个容器运行了恶意的内存消耗软件，或者代码有内存泄露，很可能会导致主机内存耗尽，因此导致服务不可用。对于这种情况，docker 会设置 docker daemon 的 OOM（out of memory） 值，使其在内存不足的时候被杀死的优先级降低。另外，就是你可以为每个容器设置内存使用的上限，一旦超过这个上限，容器会被杀死，而不是耗尽主机的内存。

限制内存上限虽然能保护主机，但是也可能会伤害到容器里的服务。如果为服务设置的内存上限太小，会导致服务还在正常工作的时候就被 OOM 杀死；如果设置的过大，会因为调度器算法浪费内存。因此，合理的做法包括：

- 为应用做内存压力测试，理解正常业务需求下使用的内存情况，然后才能进入生产环境使用
- 一定要限制容器的内存使用上限
- 尽量保证主机的资源充足，一旦通过监控发现资源不足，就进行扩容或者对容器进行迁移
- 如果可以（内存资源充足的情况），尽量不要使用 swap，swap 的使用会导致内存计算复杂，对调度器非常不友好



在 docker 启动参数中，和内存限制有关的包括（参数的值一般是内存大小，也就是一个正数，后面跟着内存单位 `b`、`k`、`m`、`g`，分别对应 bytes、KB、MB、和 GB）：

- `-m --memory`：容器能使用的最大内存大小，最小值为 4m
- `--memory-swap`：容器能够使用的 swap 大小
- `--memory-swappiness`：默认情况下，主机可以把容器使用的匿名页（anonymous page）swap 出来，你可以设置一个 0-100 之间的值，代表允许 swap 出来的比例
- `--memory-reservation`：设置一个内存使用的 soft limit，如果 docker 发现主机内存不足，会执行 OOM 操作。这个值必须小于 `--memory` 设置的值
- `--kernel-memory`：容器能够使用的 kernel memory 大小，最小值为 4m。
- `--oom-kill-disable`：是否运行 OOM 的时候杀死容器。只有设置了 `-m`，才可以把这个选项设置为 false，否则容器会耗尽主机内存，而且导致主机应用被杀死


关于 `--memory-swap` 的设置必须解释一下，`--memory-swap` 必须在 `--memory` 也配置的情况下才能有用。

- 如果 `--memory-swap` 的值大于 `--memory`，那么容器能使用的总内存（内存 + swap）为 `--memory-swap` 的值，能使用的 swap 值为 `--memory-swap` 减去 `--memory` 的值
- 如果 `--memory-swap` 为 0，或者和 `--memory` 的值相同，那么容器能使用两倍于内存的 swap 大小，如果 `--memory` 对应的值是 `200M`，那么容器可以使用 `400M` swap
- 如果 `--memory-swap` 的值为 -1，那么不限制 swap 的使用，也就是说主机有多少 swap，容器都可以使用

# 限制磁盘的读写速率

除了权重之外，docker 还允许你直接限制磁盘的读写速率，对应的参数有：

- `--device-read-bps`：磁盘每秒最多可以读多少比特（bytes）
- `--device-write-bps`：磁盘每秒最多可以写多少比特（bytes）

上面两个参数的值都是磁盘以及对应的速率，格式为 `<device-path>:<limit>[unit]`，`device-path` 表示磁盘所在的位置，限制 `limit` 为正整数，单位可以是 `kb`、`mb` 和 `gb`。

```bash
docker run -it --device /dev/sda:/dev/sda --device-read-bps /dev/sda:1mb ubuntu:16.04 bash
```

另外两个参数可以限制磁盘读写频率（每秒能执行多少次读写操作）：

- `--device-read-iops`：磁盘每秒最多可以执行多少 IO 读操作
- `--device-write-iops`：磁盘每秒最多可以执行多少 IO 写操作

```bash
docker run -it --device /dev/sda:/dev/sda --device-read-iops /dev/sda:100 ubuntu:16.04 bash
```

# 总结

从上面的实验可以看出来，CPU 和内存的资源限制已经是比较成熟和易用，能够满足大部分用户的需求。磁盘限制也是不错的，虽然现在无法动态地限制容量，但是限制磁盘读写速度也能应对很多场景。

至于网络，docker 现在并没有给出网络限制的方案，也不会在可见的未来做这件事情，因为目前网络是通过插件来实现的，和容器本身的功能相对独立，不是很容易实现，扩展性也很差。docker 社区已经有很多呼声，也有 issue 是关于网络流量限制的: [issue 26767](https://github.com/moby/moby/issues/26767)、[issue 37](https://github.com/moby/moby/issues/37)、[issue 4763](https://github.com/moby/moby/issues/4763)。

资源限制一方面可以让我们为容器（应用）设置合理的 CPU、内存等资源，方便管理；另外一方面也能有效地预防恶意的攻击和异常，对容器来说是非常重要的功能。如果你需要在生产环境使用容器，请务必要花时间去做这件事情。