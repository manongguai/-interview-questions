from typing import List, Tuple


""" 
Please solve the following question so we can better access your ability:
请解决以下问题，以便我们更好地发挥您的能力：

Robot Navigation 机器人导航

A robot needs move from top left corner to bottom right corner in a 2D map. In this map, there are 0s and 1s. 0 means the robot can pass and 1 means the wall. 
机器人需要在 2D 地图中从左上角移动到右下角。在这张地图中，有 0 和 1。 0 表示机器人可以通过，1 表示墙壁。

Please write a function that returns True or False, given at most k number of walls to demolish.
请编写一个返回 True 或 False 的函数，给定最多 k 个要拆除的墙数。

Note: The robots can only move up, down, left, right.
注意：机器人只能向上、向下、向左、向右移动。

Example 1: 示例 1：

Input: grid = [[0, 1 0], [0, 1, 0]], k = 0
输入：grid = [[0， 1 0]， [0， 1， 0]]， k = 0
Output: False 输出：False
Explanation: The robot cannot demolish any wall due to k == 0, the robot cannot reach the bottom right corner.
说明：由于 k == 0，机器人无法拆除任何墙壁，机器人无法到达右下角。

Example 2: 示例 2：

Input: grid = [[0, 1 0], [0, 1, 0]], k = 1
输入：grid = [[0， 1 0]， [0， 1， 0]]， k = 1
Output: True 输出：真
Explanation: The robot can demolish the wall (0, 1) or (1, 1) to reach the destination.
说明：机器人可以拆除墙壁（0,1）或（1,1）以到达目的地。

Example 3: 示例 3：

input: grid =  输入：grid =
[[0, 1, 0, 0, 0], 
 [0, 1, 0 ,1, 0],
 [0, 1, 0, 1, 0],
 [0, 1, 0, 1, 0],
 [0, 0, 0, 1, 0]],
k = 0
Output: True 输出：真
Explanation: The robot can first go down and then go up and then go down to reach the destination.
说明：机器人可以先下降，然后上升，再下降以到达目的地。


The function interface should be:
函数接口应为：

def robot_navigation(grid: list[list[int]], k:int)->bool:
def robot_navigation（grid： list[list[int]]， k：int）->bool：
    pass 通过

When finished, please paste your code in the answer section below
完成后，请将您的代码粘贴到下面的答案部分
*

 """

def robot_navigation(grid: List[List[int]], k: int) -> bool:
    rows, cols = len(grid), len(grid[0])  # 获取地图的行数和列数
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # 定义机器人可以移动的方向：右、下、左、上
    
    # 队列用于广度优先搜索，初始位置为左上角(0, 0)，拆除的墙数为0，路径长度为0
    queue = [(0, 0, 0, 0)]  # (row, col, walls_broken, path_length)
    
    # 用于记录访问过的点、到达该点时拆除的墙数和路径长度
    visited = {(0, 0): (0, 0)}  # (row, col) -> (walls_broken, path_length)
    
    while queue:
        r, c, walls_broken, path_length = queue.pop(0)  # 取出队列中的第一个元素

        # 如果到达了右下角，返回 True 表示可以到达
        if r == rows - 1 and c == cols - 1:
            print(f"Shortest path length: {path_length}")
            return True

        for dr, dc in directions:  # 遍历四个方向
            nr, nc = r + dr, c + dc  # 计算新的行和列位置

            if 0 <= nr < rows and 0 <= nc < cols:  # 检查新的位置是否在地图的范围内
                next_walls_broken = walls_broken + grid[nr][nc]  # 计算到达新位置需要拆除的墙数
                next_path_length = path_length + 1  # 更新路径长度

                # 如果新位置可以通过，并且拆除的墙数小于等于 k
                if next_walls_broken <= k:
                    if (nr, nc) not in visited:  # 如果新位置未被访问过
                        visited[(nr, nc)] = (next_walls_broken, next_path_length)  # 记录访问
                        queue.append((nr, nc, next_walls_broken, next_path_length))  # 添加到队列中
                    else:  # 如果新位置已经访问过，比较是否更优
                        visited_walls_broken, visited_path_length = visited[(nr, nc)]
                        if next_walls_broken < visited_walls_broken or (next_walls_broken == visited_walls_broken and next_path_length < visited_path_length):
                            visited[(nr, nc)] = (next_walls_broken, next_path_length)
                            queue.append((nr, nc, next_walls_broken, next_path_length))

    return False  # 如果搜索结束都没有找到路径，返回 False

# 校验函数，测试多个示例用例
def test_robot_navigation():
    test_cases = [
        ([[0, 1, 0, 0, 0], 
          [0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0]], 0, True),
      
    ]
    
    for i, (grid, k, expected) in enumerate(test_cases):
        result = robot_navigation(grid, k)
        assert result == expected, f"Test case {i+1} failed: expected {expected}, got {result}"
        print(f"Test case {i+1} passed.")

# 运行校验函数
test_robot_navigation()

