**COMPX532 & DSIGN532: Information Visualisation**  
**Assignment 3: Representing Relationships**  
**(Due 09 April, 2025)**  

You are to design an interactive visualization representing relationships, as in the following scenario:  

---  

### 2. Family Tree Representation  

Devise a representation of a family tree, which, as well as showing relationships, also includes concepts of time and place. For example, we might be able to pose the following sorts of questions:  

- Show me all of the first cousins of X;  
- Which members of the family were living during the 1914-18 war?  
- Which members of the family ever lived in Taranaki?  
- Does X have any cousins in Australia?  
- ...  

Try to base your solution on a single visualization, or a simple set of views onto a coherent continuous space. For example, for (3), one could imagine two linked spaces, one of the cars, and one of the owners; you would need to think how you might represent the various attributes in each of the spaces.  

The **exploratory questions** shown in each scenario are just examples; try to think of others yourself, and show how your visualization could be used to answer these. Try to avoid designing special visualizations to answer specific questions, but instead devise an overall visualization that can answer all of these and other similar questions. As much as possible you should look at ways of interacting directly and intuitively with the visualization itself, rather than indirectly using text boxes, buttons, etc.  

Again, you are **not required to produce a computer implementation** of the interaction, but rather a **design** for the way it would work. However, if at all possible, I would prefer you to provide an animated sketch, using a tool such as PowerPoint, Flash, Proto.io, or anything else you may be familiar with. You shouldn’t need a lot of text to describe your solution.  

Please do make use of visualization examples you might find on the web, or in books, etc, as inspiration or help with your design. However, you must acknowledge such sources if you do use them.  

**Hint**: Begin by deciding what **things** you will be representing, and what **relationships** you might need to represent between any of these things.  

**[10 marks]**  


# **需求标题：简化版家谱关系可视化设计**  

---  

## **目标**  
构建一套以**家族成员关系为核心**的交互式可视化设计，用来展示家族成员之间的亲属关系，并通过时间和地点的简单筛选功能满足作业需求。设计重点在于简单上手，同时能够回答以下典型问题：  
- **通过节点互动**快速理解父母、子女、表亲等关系。  
- **通过时间筛选**查看特定时间段活着的家族成员。  
- **通过地区选择框**过滤出在特定地区的成员（无地图展示）。  

---  

## **设计原型概要**  
最终设计将包括三个简化部分：  
1. **家族树图（主视图）**  
   - 核心部分，展示家族成员及其关系并支持动态展开与交互。  
2. **时间轴筛选**  
   - 滑动筛选某一时间段内活着的家庭成员。  
3. **地区选择框**  
   - 一个简单的下拉框，用于筛选出居住在特定地区的成员。  

---  

## **核心需求**  

### **（一）家族树图：核心关系展示**  
- **节点显示：**  
  - 每位家族成员用圆点表示：  
    - **蓝色**：男性  
    - **粉色**：女性  
    - **灰色**：已去世（时间筛选后动态变化）  
  - 鼠标悬浮在节点时，显示成员的详细信息（姓名、生卒年份、居住地等）。  
- **连线：**  
  - 实线：父母与子女间的关系。  
  - 虚线：配偶关系。  
- **交互功能：**  
  - 点击某节点时展开分支，查看更多亲属（如父母、兄弟姐妹、第一代表亲等）。  
  - 还可手动收缩特定分支，避免数据多时的视觉拥堵。  

### **（二）时间轴：时间筛选**  
- **设计简化**：  
  - 位于图表底部，为一条可拖动的时间轴。  
  - 用户拖动滑块选择某个年份，系统会：  
    - 灰显已去世成员的节点。  
    - 高亮仍存活的成员。  
  - 默认状态：全选所有年份，展示所有成员。  

### **（三）地区选择框：地区筛选**  
- **设计简化**：  
  - 使用一个简单的下拉菜单，选项示例：  
    ```  
    地区选择：[全地区, Taranaki, 澳大利亚, 英国]  
    ```  
  - 用户选择地区后：  
    - 高亮显示选中地区的成员节点。  
    - 其他地区的成员节点自动变浅淡（半透明）。  

---  

## **功能简化流程**  
1. **数据初始化：**  
   - 家谱树图显示完整家庭成员、关系以及他们的默认状态。  
   
2. **时间轴筛选：**  
   - 用户拖动时间轴筛选时间点，图表动态显示存活情况（已去世成员灰显）。  

3. **地区选择框筛选：**  
   - 用户从下拉菜单选择地区，视图动态高亮该地区中的成员。  

4. **动态交互：**  
   - 鼠标悬浮或点击节点，显示成员详细信息或展开支系关系。  

---  

## **问答示例**  

### **问题1：X的表亲是谁？**  
- **操作方式：** 点击“X”的节点，展开并高亮表亲关系的分支。  
- **结果：** 可直观看到与X相关的分支，包括表亲。  

### **问题2：1914年谁还活着？**  
- **操作方式**：拖动时间轴到“1914年”。  
- **结果：** 所有在1914年存活的成员节点高亮显示，去世成员节点变灰。  

### **问题3：谁住在Taranaki？**  
- **操作方式**：从地区选择框中选择“Taranaki”。  
- **结果**：图中所有居住在Taranaki的成员节点高亮显示，其他节点半透明。  

---  

## **输出内容**  
1. 一个清晰的家族树图，包括动态展开与交互功能。  
2. 一条简单时间轴，支持筛选出活着的成员。  
3. 一个地区选择功能，用于筛选和高亮居住地的成员。  

通过上述简化设计，你既能满足作业需求，又能以最小的交互复杂度实现清晰直观的家谱关系展示。  
```