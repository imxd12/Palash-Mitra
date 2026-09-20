import os
import shutil

source_dir = r"C:\Users\imada\.gemini\antigravity-ide\brain\ee3726f3-13d5-4518-a191-f521a7f69ad4"
target_dir = r"c:\SIH\images"

os.makedirs(target_dir, exist_ok=True)

files_to_copy = {
    "prob_sol_compare_1789907623336.jpg": "01_problem_vs_solution_comparison.jpg",
    "tech_flowchart_1789907645627.jpg": "02_technical_process_flowchart.jpg",
    "prototype_ui_mockup_1789907691935.jpg": "03_working_prototype_tablet_ui.jpg",
    "feasibility_viability_pic_1789907732080.jpg": "04_feasibility_and_viability_pictorial.jpg",
    "impact_benefits_graph_1789907774846.jpg": "05_impact_and_benefits_graphs.jpg",
    "research_references_pic_1789907830580.jpg": "06_research_and_references_sources.jpg"
}

for src_name, dst_name in files_to_copy.items():
    src_path = os.path.join(source_dir, src_name)
    dst_path = os.path.join(target_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied: {dst_name} ({os.path.getsize(dst_path)} bytes)")
    else:
        print(f"Not found: {src_path}")

print("All images organized in c:\\SIH\\images successfully!")
