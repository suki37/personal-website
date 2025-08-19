import json
import os

def md_to_json_string(file_path):
    """
    读取Markdown文件内容并转换为适合JSON存储的字符串
    正确处理所有JSON需要转义的字符
    
    参数:
        file_path: Markdown文件的路径
        
    返回:
        处理后的字符串，所有特殊字符均已按JSON要求转义
    """
    try:
        # 读取文件内容，使用utf-8编码
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 使用json模块的 dumps 方法处理所有需要转义的字符
        # 先序列化再去除前后的引号
        escaped_content = json.dumps(content)[1:-1]
        
        return escaped_content
    except FileNotFoundError:
        print(f"错误：找不到文件 {file_path}")
        return None
    except Exception as e:
        print(f"处理文件时发生错误：{str(e)}")
        return None

def save_to_txt(content, input_file_path):
    """将处理后的内容保存到同目录下的txt文件"""
    try:
        # 获取输入文件的目录和文件名
        dir_name = os.path.dirname(input_file_path)
        base_name = os.path.splitext(os.path.basename(input_file_path))[0]
        
        # 构造输出文件路径（同目录，原文件名+_escaped.txt）
        output_file_path = os.path.join(dir_name, f"{base_name}_escaped.txt")
        
        # 写入文件
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write(content)
            
        return output_file_path
    except Exception as e:
        print(f"保存文件时发生错误：{str(e)}")
        return None

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 2:
        print("使用方法：python md_to_json_str.py <markdown文件路径>")
        sys.exit(1)
    
    md_file_path = sys.argv[1]
    result = md_to_json_string(md_file_path)
    
    if result:
        # 保存到txt文件
        output_path = save_to_txt(result, md_file_path)
        if output_path:
            print(f"转换完成，结果已保存到：{output_path}")
